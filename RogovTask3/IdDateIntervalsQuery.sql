WITH RankedDates AS (
    SELECT 
        Id,
        Dt,
        LEAD(Dt) OVER (PARTITION BY Id ORDER BY Dt) AS NextDt
    FROM 
        Dates
)
SELECT 
    Id,
    Dt AS Sd,
    NextDt AS Ed
FROM 
    RankedDates
WHERE 
    NextDt IS NOT NULL;