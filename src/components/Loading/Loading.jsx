// import Style from './Loading.module.css';
import "ldrs/dotPulse";

export default function Loading() {
  return (
    <>
      <div className="text-center">
        <l-dot-pulse size="45" speed="1.3" color="#54e28e"></l-dot-pulse>
      </div>
    </>
  );
}
