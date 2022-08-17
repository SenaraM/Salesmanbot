import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import productsModule from "../../../apis/modules/products";


class products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchKey: "",
            products: []
        };
    }

    componentDidMount() {
        this.retrieveProducts();
    }

    retrieveProducts() {

        productsModule.retrieveProducts().then((res) => {
            this.setState({
                products: res.data,
            });
        });


    }

    onDelete = (id) => {
        if (window.confirm("Are you sure you wish to delete this user?")) {
            // axios.delete(`http://localhost:8080/api/deleteproduct/${id}`).then((res) => {
            productsModule.deleteProduct(id).then((res) => {
                alert("Deleted Successfully");
                this.retrieveProducts();

            });
        }
    };


    render() {

        return (
            <div className="container">
                <div className="card login-card">
                    <div className="container">
                        <br/>
                        <div className="row">
                            <div className="col-lg-9 mt-2 mb-2">

                                <h3><b>Product Details Dashboard</b></h3>
                            </div>
                            <div className="col-lg-3 mt-2 mb-2">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    name="searchQuery"
                                    onChange={this.handleSearchArea}></input>
                            </div>
                        </div>
                        <table className="table table-hover" style={{marginTop: "40px"}}>
                            <thead>
                            <tr>
                                <th>Index</th>
                                <th>Product code</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Price</th>
                                <th scope="col">Weight / Volume</th>
                                <th scope="col">Nutrition</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.products.map((product, index) => (

                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.id}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.price}</td>
                                    <td>{product.weightOrVoluem}</td>
                                    <td>{product.nutrition}</td>

                                    <td>
                                        <a className="btn btn-warning" href={`/editCustomer/${product.id}`}>
                                            <i className="fas fa-edit"></i>&nbsp;Edit
                                        </a>
                                        &nbsp;
                                        <button
                                            className="btn btn-danger" type=""
                                            onClick={() => this.onDelete(product.id)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <br/>
                        <button className="btn btn-success"><a href="customer/add"
                                                               style={{textDecoration: 'none', color: 'white'}}>Add New
                            Product</a></button>
                        <button className="btn btn-secondary" style={{marginLeft: "10px"}}><a href="/report" style={{
                            textDecoration: 'none',
                            color: 'white'
                        }}>Generate Product Report</a></button>
                        <button className="btn btn-dark" style={{marginLeft: "10px"}}><a href="/purchaseOrder" style={{
                            textDecoration: 'none',
                            color: 'white'
                        }}>Generate Product Purchase Report</a></button>
                    </div>
                </div>
            </div>
        )
    }

}


export default products;