import { useEffect, useState } from "react";
import { getFromXiexie } from "../../content";
import {
  Column,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectAll,
  TableSelectRow,
  Button,
} from "@carbon/react";

const Manager = () => {
  const urlString = "http://localhost:4000";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const headers = [
    { id: "id", name: "id", header: "ID" },
    { id: "profileImage", name: "profileImage", header: "IMAGE" },
    { id: "name", name: "name", header: "NAME" },
    { id: "email", name: "email", header: "EMAIL" },
    { id: "bio", name: "bio", header: "SPECIALITY" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFromXiexie(urlString);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectRow = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      const allIds = data.map((item) => item.id);
      setSelectedIds(allIds);
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedIds.includes(item.id));
    setData(updatedData);
    setSelectedIds([]);
  };

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {selectedIds.length > 0 && (
              <Button kind="danger" onClick={handleDeleteSelected}>
                Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll
                    checked={selectedIds.length === data.length}
                    onSelect={handleSelectAll}
                    id="select-all"
                  />
                  {headers.map((header) => (
                    <TableHeader key={header.id}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableSelectRow
                      checked={selectedIds.includes(item.id)}
                      onSelect={() => handleSelectRow(item.id)}
                      id={`select-${item.id}`}
                    />
                    {headers.map((header) => (
                      <TableCell key={header.id}>
                        {header.name === "profileImage" ? (
                          <img
                            src={item[header.name]}
                            alt="Profile"
                            width={40}
                          />
                        ) : (
                          item[header.name]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Column>
    </Grid>
  );
};

export default Manager;
