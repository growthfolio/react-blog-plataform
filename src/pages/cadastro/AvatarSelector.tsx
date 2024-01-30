import React, { useState } from 'react';
import fotosCadastro from './FotosCadastro';

// Seu componente AvatarSelector
const AvatarSelector = ({ fotos, onSelect }: { fotos: any[], onSelect: (link: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (link: string) => {
        onSelect(link);
        setSelectedAvatar(link);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col w-full">
            <label htmlFor="foto">Selecione seu avatar:</label>
            <div className="cursor-pointer relative inline-block mt-3">
                <span
                    onClick={handleToggle}
                    className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 px-5"
                >
                    Escolher Avatar
                </span>
                {isOpen && (
                    <div className="flex z-10 mt-1 w-40  bg-border-blue-500 border-2 border-solid
                    border-gray-300 rounded overflow-hidden"
                        style={{
                            minWidth: '100%',
                            maxWidth: '660px',
                            height: '550%',
                            cursor: 'pointer',
                        }}
                    >
                        {fotos.map((foto: any) => (
                            <div
                                key={foto.id}
                                className={`m-1 rounded-full  hover:border-2 hover:border-slate-500 
                                    ${selectedAvatar === foto.link ? 'border-2 border-slate-700 ' : 'border-slate-900'}`}
                                >
                                <img
                                    className='w-40 h-50 rounded-full '
                                    src={foto.link}
                                    alt={foto.alt}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSelect(foto.link)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvatarSelector;