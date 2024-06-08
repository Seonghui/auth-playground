'use client';

import { useModal } from '@/context/ModalContext';
import Confirm from '@/src/component/common/Confirm';

export default function Home() {
  const { addModal, removeModal } = useModal();
  const handleClickDelete = () => {
    addModal(
      <Confirm
        content={
          <div>
            삭제하시겠습니까?
            <br />
            * github API에 삭제 API 없어 <br />
            API 연동 없이 모달로만 처리했습니다.
          </div>
        }
        onClose={() => {
          removeModal();
        }}
        onCloseLabel="취소"
        onConfirmLabel="삭제"
        onConfirm={() => {}}
      />,
    );
  };
  return (
    <main>
      <div
        css={`
          background: papayawhip;
        `}
      >
        <div>홈페이지</div>
        <button onClick={handleClickDelete}>모달 나오나용</button>
      </div>
    </main>
  );
}
