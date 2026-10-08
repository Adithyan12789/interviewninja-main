interface StrengthsBadgesProps {
  strengths: string[];
}

const StrengthsBadges = ({ strengths }: StrengthsBadgesProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-xl font-semibold">Strengths</h3>
      <div className="flex flex-wrap gap-3">
        {strengths.map((strength, index) => (
          <div
            key={index}
            className="bg-[#cac5fe]/20 text-[#cac5fe] border border-[#cac5fe]/30 rounded-full px-4 py-2 text-sm font-medium"
          >
            {strength}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrengthsBadges;