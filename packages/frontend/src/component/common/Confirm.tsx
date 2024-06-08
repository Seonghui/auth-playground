import React, { ReactNode } from 'react';
import Modal from './Modal';
import Flex from './Flex';

interface AlertProps {
  title?: string;
  content?: ReactNode;
  onClose: () => void;
  onCloseLabel?: string;
  onConfirm: () => void;
  onConfirmLabel?: string;
}

export default function Confirm({
  title,
  content,
  onClose,
  onCloseLabel = '닫기',
  onConfirm,
  onConfirmLabel = '확인',
}: AlertProps) {
  return (
    <Modal
      header={<div>{title}</div>}
      content={<div>{content}</div>}
      footer={
        <Flex justify="space-between" gap={8}>
          <button onClick={onClose}>{onCloseLabel}</button>
          <button onClick={onConfirm}>{onConfirmLabel}</button>
        </Flex>
      }
    />
  );
}
