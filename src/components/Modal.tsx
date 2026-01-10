"use client";


export default function Modal({ isOpen, onClose, children }: any) {
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative m-2">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}