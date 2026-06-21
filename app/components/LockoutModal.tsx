interface LockoutModalProps {
  message: string;
  onClose: () => void;
}

export default function LockoutModal({ message, onClose }: LockoutModalProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lockout-title"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
        <h2 id="lockout-title" className="text-lg font-bold text-red-600 mb-2">
          계정이 잠겼습니다
        </h2>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          확인
        </button>
      </div>
    </div>
  );
}
