import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  PropsWithChildren,
} from 'react';

// ModalContext 타입 정의
interface ModalContextType {
  addModal: (modal: ReactNode) => void;
  removeModal: () => void;
  clearModals: () => void;
}

// 초기값 설정
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Context Provider 컴포넌트 생성
export function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<ReactNode[]>([]);

  // 모달 추가 함수
  const addModal = useCallback((modalComponent: ReactNode) => {
    setModals(prevModals => [...prevModals, modalComponent]);
  }, []);

  // 모달 제거 함수
  const removeModal = useCallback(() => {
    setModals(prevModals => prevModals.slice(1));
  }, []);

  const clearModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ addModal, removeModal, clearModals }}>
      {children}
      {modals.length > 0 && (
        <div className="modal-container">
          {modals.map((ModalComponent, index) => (
            <React.Fragment key={index}>{ModalComponent}</React.Fragment>
          ))}
        </div>
      )}
    </ModalContext.Provider>
  );
}

// Custom Hook 생성
export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
