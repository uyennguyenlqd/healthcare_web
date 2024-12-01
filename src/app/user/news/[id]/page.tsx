"use client";
import { useEffect, useState } from "react";

import Preloader from "@/components/medicalNews/Preloader";
import { ENV } from "@/constants/env";

export default function PostItem({
  params: { id },
}: {
  params: { id: string };
}) {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await fetch(
          `${ENV}/api/v1/news/get_single_post/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setItem(data.data);
      } catch (error: any) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchSinglePost();
  }, [id]);

  return (
    <section className="single-post-content" style={{ padding: "24px 96px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-9 post-content" data-aos="fade-up">
            {item ? (
              <div className="single-post">
                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.07rem",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    fontFamily: "var(--font-secondary)",
                    color: "rgba(var(--color-black-rgb), 0.4)",
                    width: "fit-content",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <span className="date">{item.category}</span>{" "}
                  <span className="mx-1">
                    <i className="bi bi-dot"></i>
                  </span>{" "}
                  <span>{new Date(item.date).toLocaleDateString("en-US")}</span>
                </div>
                <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
                  {item.title}
                </h1>
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    fontFamily: "Georgia, serif",
                    color: "#333",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      float: "left",
                      fontFamily: "Georgia, serif",
                      fontSize: "75px",
                      lineHeight: "60px",
                      paddingTop: "4px",
                      paddingRight: "8px",
                      paddingLeft: "3px",
                    }}
                  >
                    {item.brief && item.brief.charAt(0)}
                  </span>
                  {item.brief && item.brief.substring(1)}
                </p>

                <p>{item.content}</p>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={`${item.img}`}
                    alt=""
                    className="img-fluid"
                    style={{ borderRadius: "8px", maxHeight: "500px" }}
                  />
                </div>

                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    fontFamily: "Georgia, serif",
                    color: "#333",
                    marginBottom: "16px",
                  }}
                >
                  Sunt reprehenderit, hic vel optio odit est dolore, distinctio
                  iure itaque enim pariatur ducimus. Rerum soluta, perspiciatis
                  voluptatum cupiditate praesentium repellendus quas expedita
                  exercitationem tempora aliquam quaerat in eligendi adipisci
                  harum non omnis reprehenderit quidem beatae modi. Ea fugiat
                  enim libero, ipsam dicta explicabo nihil, tempore, nulla
                  repellendus eos necessitatibus eligendi corporis cum? Eaque
                  harum, eligendi itaque numquam aliquam soluta.
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.2",
                    fontFamily: "Georgia, serif",
                    color: "#333",
                    marginBottom: "16px",
                  }}
                >
                  Explicabo perspiciatis, laborum provident voluptates illum in
                  nulla consectetur atque quaerat excepturi quisquam, veniam
                  velit ex pariatur quos consequuntur? Excepturi reiciendis
                  perferendis, cupiditate dolorem eos illum amet. Beatae
                  voluptates nemo esse ratione voluptate, nesciunt fugit magnam
                  veritatis voluptas dignissimos doloribus maiores? Aliquam,
                  dolores natus exercitationem corrupti blanditiis, consequuntur
                  nihil nobis sed voluptatibus maiores sunt, illo provident
                  aliquid laborum. Vitae, ut.
                </p>
              </div>
            ) : (
              <Preloader />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
