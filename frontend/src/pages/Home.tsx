import { useEffect, useState } from "react";
import API from "../services/api";
import ExperienceCard from "../components/ExperienceCard";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/experiences")
      .then(res => setExperiences(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-8">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px]">
        {experiences.map(exp => (
          <Link to={`/details/${exp._id}`} key={exp._id}>
            <ExperienceCard experience={exp} />
          </Link>
        ))}
      </div>
    </div>
  );
}
