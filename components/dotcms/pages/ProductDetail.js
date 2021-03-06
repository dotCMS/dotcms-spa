import React from 'react';
import { Button } from '../../../styles/shared.styles';
const { currencyFormatter } = require('../../../utilities');
import Carousel from '../../Carousel';
import styled from 'styled-components';

import {
    ProductContainer,
    ProductDetailContainer,
    Price,
    Quantity
} from '../../../styles/products/product.styles';

const Content = styled.div`
    margin-bottom: 1.6rem;
`;

function ProductDetail({ pageRender: { urlContentMap } }) {
    const {
        title,
        description,
        retailPrice,
        salePrice,
        identifier,
        image,
        image2,
        image3,
        specifications1
    } = urlContentMap;

    const imagesFound = () => {
        return !!image || !!image2 || !!image3;
    };

    const renderSpecs = () => {
        // Removes tab character that may come from the API and parses the object
        try {
            const specifications = JSON.parse(specifications1.replace(/\t+/g, ''));
            const specsArr = [];
            for (var key in specifications) {
                specsArr.push(
                    <li key={key}>
                        <b>{key}</b>: {specifications[key]}
                    </li>
                );
            }
            return specsArr;
        } catch {
            return [];
        }
    };

    return (
        <ProductContainer className="container">
            {imagesFound() && (
                <Carousel
                    images={{ image, image2, image3 }}
                    identifier={identifier}
                    title={title}
                />
            )}

            <ProductDetailContainer>
                <div className="meta">
                    <h3 className="meta__title">{title}</h3>
                    <Price salePrice={!!salePrice}>
                        {currencyFormatter.format(retailPrice.replace(/\,/g, ''))}
                    </Price>
                    {salePrice && <Price>{currencyFormatter.format(salePrice)}</Price>}
                </div>

                <Content dangerouslySetInnerHTML={{ __html: description }} />

                {renderSpecs().length > 1 && (
                    <>
                        <h4>Specifications</h4>
                        <ul>{renderSpecs()}</ul>
                    </>
                )}

                <label htmlFor="product_quantity" className="visually-hidden">
                    Quantity
                </label>
                <Quantity
                    type="number"
                    name="product_quantity"
                    id="product_quantity"
                    placeholder="1"
                />
                <Button href="#">Add to cart</Button>
            </ProductDetailContainer>
        </ProductContainer>
    );
}

export default ProductDetail;
