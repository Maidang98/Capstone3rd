export default function Loading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 w-100 bg-dark">
      
      {/* Spinner */}
      <div className="position-relative">
        <div 
          className="border border-4 border-secondary rounded-circle" 
          style={{ width: "64px", height: "64px" }}
        ></div>
        
        <div 
          className="position-absolute top-0 start-0 border border-4 border-primary border-top-0 rounded-circle spinner-border" 
          style={{ width: "64px", height: "64px" }}
        ></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-secondary small text-uppercase fw-bold animate-pulse">
        Loading Admin System...
      </p>

      {/* Dots */}
      <div className="mt-2 d-flex gap-1">
        <span className="bg-danger rounded-circle d-inline-block bounce" style={{ width: "8px", height: "8px", animationDelay: "-0.3s" }}></span>
        <span className="bg-danger rounded-circle d-inline-block bounce" style={{ width: "8px", height: "8px", animationDelay: "-0.15s" }}></span>
        <span className="bg-danger rounded-circle d-inline-block bounce" style={{ width: "8px", height: "8px" }}></span>
      </div>

    </div>
  );
}
