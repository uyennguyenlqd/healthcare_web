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
                <div className="post-meta">
                  <span className="date">{item.category}</span>{" "}
                  <span className="mx-1">
                    <i className="bi bi-dot"></i>
                  </span>{" "}
                  <span>{new Date(item.date).toLocaleDateString("en-US")}</span>
                </div>
                <h1 className="mb-5">{item.title}</h1>
                <p>
                  <span className="firstcharacter">
                    {item.brief && item.brief.charAt(0)}
                  </span>
                  {item.brief && item.brief.substring(1)}
                </p>

                <p>{item.content}</p>

                <img
                  src={`${item.img}`}
                  alt=""
                  className="img-fluid"
                  style={{ justifyContent: "center" }}
                />
                <figcaption>{item.imgCaption}</figcaption>

                <p>{item.additionalContent}</p>
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
