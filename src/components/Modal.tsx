"use client";


export default function Modal({ isOpen, onClose, children }: any) {
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-md md:max-w-lg relative shadow-2xl transform transition-all animate-slideUp">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90 active:scale-90 text-xl md:text-2xl font-light"
                    aria-label="Close modal"
                >
                    ✕
                </button>
                {children}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
