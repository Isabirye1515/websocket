export const getFromXiexie = async (url) => {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  };
  