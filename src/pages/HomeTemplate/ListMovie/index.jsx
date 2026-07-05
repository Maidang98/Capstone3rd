import { useEffect, useState } from "react";
import api from "../../../services/api";
import Movie from "./../_components/moive";
import LoadingSkeleton from "./../_components/loading";

export default function ListMovie() {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ loading: true, data: null, error: null });

        const token = "YOUR_TOKEN_HERE";

        const [resGroup1, resGroup2] = await Promise.all([
          api.get("https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01", { headers: { TokenCybersoft: token } }),
          api.get("https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03", { headers: { TokenCybersoft: token } }),
        ]);

        const combinedData = [...resGroup1.data.content, ...resGroup2.data.content];
        const uniqueMovies = combinedData.filter(
          (movie, index, self) => index === self.findIndex((m) => m.maPhim === movie.maPhim)
        );

        setState({ loading: false, data: uniqueMovies, error: null });
      } catch (error) {
        console.log("Error loading data", error);
        setState({ loading: false, data: null, error: error });
      }
    };
    fetchData();
  }, []);

  const filteredMovies = state.data?.filter((movie) => {
    const isNowShowing = movie.dangChieu === true;
    const matchesSearch = movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase());
    return isNowShowing && matchesSearch;
  });

  return (
    <div className="min-vh-100 pt-5 pb-5 position-relative text-white bg-black">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-5 border-bottom pb-4 gap-3">
          <div>
            <h1 className="fw-bold text-uppercase">
              Now <span className="text-danger">Showing</span>
            </h1>
            <div className="d-flex align-items-center gap-2">
              <span className="bg-danger rounded-pill" style={{width:"2rem",height:"0.25rem"}}></span>
              <p className="text-secondary fst-italic">
                Found {state.loading ? "..." : filteredMovies?.length} movies available
              </p>
            </div>
          </div>

          {/* Search box */}
          <div className="position-relative w-100 w-lg-50">
            <input
              type="text"
              placeholder="Enter the movie name you want to watch..."
              className="form-control bg-black border border-secondary text-white ps-5"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
          </div>
        </div>

        {/* Movie list */}
        <div style={{minHeight:"400px"}}>
          {state.loading ? (
            <div className="row g-4 align-items-stretch">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="col-6 col-lg-3">
                  <LoadingSkeleton />
                </div>
              ))}
            </div>
          ) : filteredMovies?.length > 0 ? (
            <div className="row g-4 align-items-stretch">
              {filteredMovies.map((movie) => (
                <div key={movie.maPhim} className="col-6 col-lg-3 d-flex">
                  <Movie movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-black bg-opacity-25 rounded border border-secondary">
              <i className="fa-solid fa-clapperboard display-4 mb-3 opacity-25"></i>
              <p className="fw-bold fst-italic text-secondary">Sorry, no matching movies found!</p>
              <button
                onClick={() => setSearchTerm("")}
                className="btn btn-link text-danger fw-bold mt-3"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`btn btn-danger rounded-circle position-fixed d-flex align-items-center justify-content-center shadow ${showBackToTop ? "opacity-100" : "opacity-0"} transition`}
        style={{bottom:"2rem",right:"2rem",width:"3rem",height:"3rem"}}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* Decorative blur */}
      <div className="position-fixed bottom-0 start-0 rounded-circle bg-danger bg-opacity-25" 
           style={{width:"15rem",height:"15rem",filter:"blur(80px)",zIndex:0}}></div>
    </div>
  );
}
