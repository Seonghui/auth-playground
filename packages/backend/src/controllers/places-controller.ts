import { Response, Request, NextFunction } from 'express';
import Place from '../models/place';
import { HttpError } from '../models/http-error';
import User from '../models/user';
import mongoose from 'mongoose';

const getPlaces = async (req: Request, res: Response) => {
  const placeList = await Place.find();

  return res.status(201).json({
    places: placeList,
  });
};

const createPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description } = req.body;

  const location = {
    lat: 123,
    lng: 456,
  };

  const createdPlace = new Place({
    title,
    description,
    address: `주소 + ${Math.random()}`,
    location: location,
    image: 'https://picsum.photos/200',
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      500,
      'Creating place failed, please try again.',
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(404, 'Could not find user for provided id.');
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      500,
      'Creating place failed, please try again.',
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userData.userId;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new HttpError(
      500,
      'Fetching places failed, please try again later.',
    );
    return next(error);
  }

  if (!userWithPlaces) {
    return next(
      new HttpError(404, 'Could not find places for the provided user id.'),
    );
  }

  res.json({
    places: userWithPlaces.places.map(place =>
      place.toObject({ getters: true }),
    ),
  });
};

export default { getPlaces, createPlaces, getPlacesByUserId };
