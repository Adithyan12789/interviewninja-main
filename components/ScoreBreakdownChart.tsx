interface ScoreBreakdownChartProps {
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
}

const ScoreBreakdownChart = ({ categoryScores }: ScoreBreakdownChartProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "#49de50"; // green
    if (score >= 50) return "#f5a623"; // yellow
    return "#f75353"; // red
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return "bg-[#49de50]";
    if (score >= 50) return "bg-[#f5a623]";
    return "bg-[#f75353]";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 70) return "text-[#49de50]";
    if (score >= 50) return "text-[#f5a623]";
    return "text-[#f75353]";
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-white text-xl font-semibold">Category Scores</h3>
      <div className="flex flex-col gap-6">
        {categoryScores.map((category, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{category.name}</span>
                <span className={`font-bold ${getScoreTextColor(category.score)}`}>
                  {category.score}/100
                </span>
              </div>
              <div className="text-sm text-gray-400">{category.comment}</div>
            </div>
            <div className="w-full h-4 bg-[#27282f] rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getScoreBgColor(category.score)} transition-all duration-500`}
                style={{ 
                  width: `${category.score}%`,
                  backgroundColor: getScoreColor(category.score)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBreakdownChart;