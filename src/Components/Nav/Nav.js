import React, { Component } from 'react';
import { Nav as BootstrapNav, NavbarToggler, Collapse } from 'reactstrap';
import DotCMSApi from '../../libs/dotcms.api';
import NavOption from '../../Components/Nav/NavOption';
import NavDropDown from './NavDropDown';
import './Nav.css';

export default class Nav extends Component {
    state = {
        collapsed: false,
        showLogin: false,
        items: []
    };

    componentDidMount() {
        DotCMSApi.request({
            url: `${process.env.REACT_APP_DOTCMS_HOST}/api/v1/nav//?depth=3`
        })
            .then(response => response.json())
            .then(data => data.entity.children)
            .then(data => {
                this.setState({
                    ...this.state,
                    items: data
                });
            })
            .catch(e => console.error(`.catch(${e})`));
    }

    toggleCollapsed = e => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        });
    };

    toggleLogin = e => {
        this.setState({
            ...this.state,
            showLogin: !this.state.showLogin
        });
    };

    render() {
        return (
            <>
                <NavbarToggler className="nav-menu__toggle-button" onClick={this.toggleCollapsed} >&#9776;</NavbarToggler>
                <Collapse className="nav-menu__links" isOpen={this.state.collapsed} navbar>
                    <BootstrapNav>
                        {this.state.items.map((item) => {
                            if (item.children.length && item.type === 'folder') {
                                return <NavDropDown key={item.hash} options={item} />;
                            } else {
                                return <NavOption key={item.hash} item={item} />;
                            }
                        })}
                    </BootstrapNav>
                </Collapse>
            </>
        );
    }
}