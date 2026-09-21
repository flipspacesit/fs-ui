import React from "react";


interface WrapTextProps {
    size?: number | string;
    fill?: string;
}

export const WrapText: React.FC<WrapTextProps> = ({
    size = 15,
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_730_3218)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 2.65625C2.75888 2.65625 2.96875 2.86612 2.96875 3.125V11.875C2.96875 12.1339 2.75888 12.3438 2.5 12.3438C2.24112 12.3438 2.03125 12.1339 2.03125 11.875V3.125C2.03125 2.86612 2.24112 2.65625 2.5 2.65625Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.78125C7.75888 0.78125 7.96875 0.991119 7.96875 1.25V5C7.96875 5.25888 7.75888 5.46875 7.5 5.46875C7.24112 5.46875 7.03125 5.25888 7.03125 5V1.25C7.03125 0.991119 7.24112 0.78125 7.5 0.78125Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.53125 7.5C4.53125 7.24112 4.74112 7.03125 5 7.03125H13.125C13.3839 7.03125 13.5938 7.24112 13.5938 7.5C13.5938 7.75888 13.3839 7.96875 13.125 7.96875H5C4.74112 7.96875 4.53125 7.75888 4.53125 7.5Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2479 5.6103C11.4305 5.42683 11.7273 5.42616 11.9108 5.60881L13.4848 7.17575C13.6678 7.35794 13.669 7.65375 13.4875 7.83744L11.9135 9.43038C11.7316 9.61456 11.4348 9.61631 11.2506 9.43438C11.0664 9.25238 11.0647 8.95563 11.2466 8.77144L12.4924 7.51069L11.2494 6.27319C11.0659 6.09056 11.0653 5.79377 11.2479 5.6103Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 9.53125C7.75888 9.53125 7.96875 9.74112 7.96875 10V13.75C7.96875 14.0089 7.75888 14.2188 7.5 14.2188C7.24112 14.2188 7.03125 14.0089 7.03125 13.75V10C7.03125 9.74112 7.24112 9.53125 7.5 9.53125Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_730_3218">
                    <rect width="15" height="15" fill="white" />
                </clipPath>
            </defs>
        </svg>

    );
};

export default WrapText;
