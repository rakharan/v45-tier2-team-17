import React ,{useState,useCallback} from 'react'
import { useGlobalContext } from "../../context";
import { PieChart, Pie,Sector} from "recharts";


const renderActiveShape = ({cx,cy,midAngle,innerRadius,outerRadius,startAngle,endAngle,fill,payload,percent,value}) => {
  
  // converting degrees to radians.
  const RADIAN = Math.PI / 180;

  // These Values are used to determine the position of various elements within the active shape.
  // It calculates coordinates (sx, sy, mx, my, ex, ey) for drawing a line and text within the active shape (Arc)
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  // Returning ARC for active shape with text no. of strikes and composition percent
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#E8E251"} fontSize={"20px"}>
        {payload.recclass}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff"
      >{`Strikes : ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#fff"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};



const StrikeByComposition = () => {

  const { filteredData } = useGlobalContext();
  let compositionMap = {};

  // Calculating Number of Strikes Per Year 
  filteredData.forEach(element => {
    let composition = element.recclass ;
    if(compositionMap[composition]){
        compositionMap[composition]++;
    }else{
        compositionMap[composition] = 1;
    } 

  });
  
  // Mapping the composition object into Array data structure
  const compositionData = Object.keys(compositionMap).map(recclass => ({
    recclass,
    strikes: compositionMap[recclass] 
  }));
 
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={1000} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={compositionData}
        cx={500}
        cy={200}
        innerRadius={100}
        outerRadius={160}
        fill="#888888"
        dataKey="strikes"
        nameKey="recclass"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );

}

export default StrikeByComposition