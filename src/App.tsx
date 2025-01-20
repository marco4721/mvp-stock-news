import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetNews } from "./useNews";
import {
  Autocomplete,
  Box,
  Collapse,
  IconButton,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetTickers } from "./useTickers";
import { useEffect, useState } from "react";
import { New, Ticker } from "./interfaces";
import { format } from "date-fns";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [selectedStock, setSelectedStock] = useState<Ticker | null>(null);
  const [openDescription, setOpenDescription] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const { data: { results: news } = {}, isLoading } = useGetNews({
    ticker: selectedStock?.symbol || "",
  });
  const { data: tickers } = useGetTickers({
    ticker: debouncedValue.toUpperCase(),
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(filterText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filterText]);

  const getSentimentColor = (sentiment: New["sentiment"]) => {
    console.log(sentiment);
    switch (sentiment) {
      case "positive":
        return "rgba(0, 128, 0, 0.7) !important";
      case "negative":
        return "rgba(255, 0, 0, 0.7) !important";

      default:
        return "rgba(128, 128, 128, 0.19) !important";
    }
  };

  return (
    <Stack gap={3}>
      <Autocomplete
        id="free-solo-demo"
        filterOptions={(x) => x}
        options={tickers || []}
        getOptionLabel={({ name }) => name}
        onChange={(_, value) => setSelectedStock(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={filterText}
            label="Stocks"
            onChange={({ target }) => setFilterText(target.value)}
          />
        )}
      />

      <TableContainer
        component={Paper}
        sx={{ marginLeft: "auto", maxHeight: "80vh" }}
      >
        <LinearProgress sx={{ visibility: isLoading ? "visible" : "hidden" }} />

        <Table sx={{ width: "80vw" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Fecha</StyledTableCell>
              <StyledTableCell align="left">Título</StyledTableCell>
              <StyledTableCell align="left">Portal</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {news?.map((row) => (
              <>
                <StyledTableRow
                  key={row.id}
                  sx={{ backgroundColor: getSentimentColor(row.sentiment) }}
                >
                  <StyledTableCell component={"th"} scope="row">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        setOpenDescription((prev) => {
                          if (prev !== row.id) {
                            return row.id;
                          } else {
                            return null;
                          }
                        })
                      }
                    >
                      {openDescription === row.id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {format(row.date, "dd-MM-yy hh:mm")}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Link href={row.link} target="_blank" color="textPrimary">
                      {row.title}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.publisher}
                  </StyledTableCell>
                </StyledTableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openDescription === row.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography gutterBottom component="div">
                          {row.description}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
            {!news?.length && !isLoading && (
              <Box
                paddingY="200px"
                display={"flex"}
                justifyContent={"center"}
                position={"absolute"}
                left={0}
                right={0}
              >
                <Typography fontSize={25} fontWeight={700}>
                  Sin resultados
                </Typography>
              </Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
