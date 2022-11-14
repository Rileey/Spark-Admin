import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function Home() {


  const MONTHS =  useMemo(() =>

   [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ], []
)
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
      const response = await axios.get("/users/stats", {
        headers: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZGJhNWQ5ZGY1NmEzMzhhNTFmNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDA2MzUwNDMsImV4cCI6MTY0MzIyNzA0M30.A18PZVix0Crqz7ya9iaP57EIZzNcO1wb3ob2ArQ_zOA'
        },
      })
      const statList = response.data.sort((a, b) => {
        return a._id - b._id
      })
      statList.map (item => setStats(prev => [...prev,
         {name: MONTHS[item._id - 1 ], 'New Users': item.total}
        ])
        )
    } catch (err) {
      console.log(err) 
    } 
  }
    getStats()
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={stats} title="User Analytics" grid dataKey="New Users"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
