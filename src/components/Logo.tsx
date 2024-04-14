interface ILogoProps extends React.SVGProps<SVGSVGElement>
{
  size?: number;
  fill?: string;
};

interface SVG extends React.SVGProps<SVGSVGElement>
{ };

const LogoContent = ({ ...props }:SVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={476.292}
    height={561.82}
    viewBox="0 0 126.019 148.648"
    {...props}
  >
    <path
      d="M54.91 116.71 82.55 70.1l52.908.297-27.714 46.091 26.825 46.98 9.633-15.264 15.858.444-20.897 35.57 20.6 34.53h-42.09l-20.155-34.827 11.708-20.6-16.599.148-10.67-19.267-8.596 13.931 14.672 26.084-32.457-.296-14.079-25.936 15.643-27.567 5.606.027zm90.127-29.048 3.092-3.04 19.335.21-10.428 17.973 10.48 17.658-11.458-.122-10.003-17.562 4.15-7.78z"
      style={{
        // fill: props.fill || "#fff",
        fillOpacity: 1,
        strokeWidth: 0.264583,
      }}
      transform="translate(-41.497 -70.1)"
    />
  </svg>
);

const Logo = ({ size=24, ...props }:ILogoProps) => (
  <div className={props?.className}>
    <LogoContent 
      width={size}
      height={size}
      {...props} 
    />
  </div>
)
export default Logo