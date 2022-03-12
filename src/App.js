import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Pagination, Spinner, Table } from "react-bootstrap";
import DetailsModal from "./components/modal/detailsModal/DetailsModal";

function App() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [results, setResults] = useState(10);
    async function fetchData() {
        const response = await axios.get(
            `https://randomuser.me/api/?page=${currentPage}&results=${results}`
        );
        setData(response.data.results);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [currentPage, results]);

    let items = [];
    for (let number = 1; number <= 10; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === activePage}
                onClick={() => {
                    setLoading(true);
                    setCurrentPage(number);
                    setActivePage(number);
                }}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="App container user-select-none">
            <DetailsModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <div className=" my-3">
                <Form.Control
                    className="input-box"
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    placeholder="Search by Name, Gender, Age or Email"
                />
            </div>
            <div className="d-lg-flex justify-content-start mb-3">
                <label className="form-label w-100">
                    Showing {results} items per page
                </label>
                <input
                    type="range"
                    className="form-range"
                    min="10"
                    max="100"
                    step="10"
                    value={results}
                    onChange={(e) => {
                        setResults(e.target.value);
                        setLoading(true);
                    }}
                />
            </div>
            {loading ? (
                <div className="mb-4 d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div>
                    <Table responsive="sm" className="border">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data
                                .filter(
                                    (item) =>
                                        item.name.first
                                            .toUpperCase()
                                            .includes(search.toUpperCase()) ||
                                        item.name.last
                                            .toUpperCase()
                                            .includes(search.toUpperCase()) ||
                                        item.email
                                            .toUpperCase()
                                            .includes(search.toUpperCase()) ||
                                        item.gender
                                            .toUpperCase()
                                            .includes(search.toUpperCase()) ||
                                        item.dob.age == search
                                )
                                .map((item, index) => (
                                    <tr
                                        className="table-row "
                                        key={index}
                                        onClick={() => {
                                            setModalShow(true);
                                            setModalData(item);
                                        }}
                                    >
                                        <td className="">
                                            {item.name.first} {item.name.last}
                                        </td>
                                        <td className=" ">{item.gender}</td>
                                        <td className="">{item.dob.age}</td>
                                        <td className=" ">{item.email}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <Pagination>{items}</Pagination>
        </div>
    );
}

export default App;
