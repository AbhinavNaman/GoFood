//Home.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [search, setSeach] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);


  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0], response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={
        {
          objectFit: "contain !important"
        }
      }>
        <div className="carousel-inner">
          <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSeach(e.target
              .value)}}/>

            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://th.bing.com/th/id/OIP.n-x0aGScXztEGuUuN356nQHaE8?pid=ImgDet&rs=1" className="d-block w-100" alt="" style={{ filter: "brightness(30%)", height: "500px", width: "auto", objectFit:"fill" }} />
          </div>
          <div className="carousel-item">
            <img src="https://th.bing.com/th/id/R.a90f420ad8c71c3aacf28f87de3f1708?rik=A5WC8v2va1qFGg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-n-jZjyEzncE%2fUq8IxN6-giI%2fAAAAAAAADWk%2fOL-YhSPEG_4%2fs1600%2fPizza%2bFood%2bHd%2bWallpaper.jpg&ehk=P%2f8NwSvvwjLvNExGqNkmVRip5lATlUieTUwxOT6m2D0%3d&risl=&pid=ImgRaw&r=0" className="d-block w-100" alt="" style={{ filter: "brightness(30%)" , height: "500px", width: "auto", }} />
          </div>
          <div className="carousel-item">
            <img src="https://th.bing.com/th/id/R.a40dd057d95eded5a4c736fd82a962d2?rik=wNOQdKgNCAlz2g&pid=ImgRaw&r=0" className="d-block w-100" alt="" style={{ filter: "brightness(30%)" , height: "500px", width: "auto", }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItems !== []
                      ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                        .map(filterItem => {
                          return (
                            <div key={filterItem._id} className="col-sm-12 col-md-6 col-lg-3">
                              <Card
                                foodItem = {filterItem}
                                options={filterItem.options[0]}
                              />
                            </div>
                          )
                        })
                      : <div>No such data found</div>
                  }
                </div>
              )
            })
            : <div></div>
        }
      </div>

      <Footer />
    </div>
  );
};

export default Home;
