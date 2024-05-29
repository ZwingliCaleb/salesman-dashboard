import React from "react";

interface TopCardProps {
    title: string;
    value: number;
}

const TopCard: React.FC<TopCardProps> = ({ title, value}) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    )
}

export default TopCard;