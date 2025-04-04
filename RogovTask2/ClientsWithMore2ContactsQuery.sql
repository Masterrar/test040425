SELECT 
    c.ClientName
FROM 
    Clients c
JOIN 
    ClientContacts cc ON c.Id = cc.ClientId
GROUP BY 
    c.ClientName
HAVING 
    COUNT(cc.Id) > 2;