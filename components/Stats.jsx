"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";


const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DB_URL}stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[90vw] mx-auto xl:max-w-none">
          {stats.map((stat, index) => {
            return (
              <div
                className="flex-1 flex gap-3 items-center justify-center xl:justify-start"
                key={index}
              >
                <div className="flex">
                  <CountUp
                    end={stat.num}
                    duration={2}
                    delay={1}
                    className="text-2xl xl:text-4xl font-extrabold"
                  />
                  <p className="text-2xl xl:text-4xl font-extrabold ml-0">
                    {stat.plus ? "+" : ""}
                  </p>
                </div>
                <p
                  className={`${
                    stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug text-white/80`}
                >
                  {stat.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
