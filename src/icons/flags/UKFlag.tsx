export const UKFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#UKFlag_a)"><mask id="UKFlag_b" width="400" height="200" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}><path fill="#fff" d="M0 0v200h400V0z"/></mask><g mask="url(#UKFlag_b)"><path fill="#001e6d" d="M0 0v200h400V0z"/><path fill="#fff" fillRule="evenodd" d="M155.3 100-9 17.9 8.9-18 200 77.6l191-95.5L409 18l-164.4 82L409 182.1 391.1 218 200 122.4 9 217.9-9 182z" clipRule="evenodd"/><mask id="UKFlag_c" width="400" height="200" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}><path fill="#fff" d="M200 100h200v100zm0 0v100H0zm0 0H0V0zm0 0V0h200z"/></mask><g mask="url(#UKFlag_c)"><path fill="#c8102e" fillRule="evenodd" d="M170.2 100-6 12 6-12l194 97 194-97 12 24-176.2 88L406 188l-12 24-194-97L6 212l-12-24z" clipRule="evenodd"/></g><path fill="#fff" fillRule="evenodd" d="M166.7 66.7V0h66.6v66.7H400v66.6H233.3V200h-66.6v-66.7H0V66.7z" clipRule="evenodd"/><path fill="#c8102e" fillRule="evenodd" d="M180 80V0h40v80h180v40H220v80h-40v-80H0V80z" clipRule="evenodd"/></g></g><defs><clipPath id="UKFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
