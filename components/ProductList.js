import React, { useEffect } from 'react';
import Product from '../components/Product';
import { useApollo } from '../config/apollo';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { ProductGrid, StatusIndicator } from '../styles/products/product.styles';
import TagsFilter from './TagsFilter';
import useTagsList from '../hooks/useTagsList';
import useTagsFiltered from '../hooks/useTagsFiltered';
import Loading from './Loading';

const PRODUCTS_QUERY = gql`
    query PRODUCTS_QUERY($limit: Int, $query: String) {
        ProductCollection(limit: $limit, query: $query) {
            title
            retailPrice
            salePrice
            urlTitle
            identifier
            tags
            modDate
            host {
                hostName
            }
            image {
                idPath
            }
            image2 {
                idPath
            }
            image3 {
                idPath
            }
            category {
                name
                key
            }
        }
    }
`;

function ProductList({ quantity, show, showTagsFilter, productLine, width, height }) {
    const client = useApollo();
    let category;

    if (productLine) {
        [category] = productLine;
        category = Object.values(category)[0].toLowerCase?.();
    }

    const tagsList = useTagsList(category);
    const [tagsFiltered, setRoutePath, tagsMap] = useTagsFiltered();

    const getUrl = (category, tags) => {
        const tagsUrl = tags.length > 0 ? `-${tags.join('-')}` : '';
        return `/store/category/${category}${tagsUrl}`;
    };

    const query = `+contentType:product ${category && `+categories:${category}`} ${
        tagsMap && tagsMap.length > 0 ? `+(${tagsMap.join(' ')})` : ''
    }`;

    let options = { variables: { limit: quantity, query }, client };
    const [getData, { loading, data, error }] = useLazyQuery(PRODUCTS_QUERY, options);

    useEffect(() => {
      // To avoid running the GraphQL query in the server we run it only if we're in client-side
      if (window !== 'undefined') {
        getData();
      }
    }, [])

    if (error) return `Error! ${error}`;

    return (
        <>
            {showTagsFilter && (
                <TagsFilter
                    list={tagsList}
                    selected={tagsFiltered}
                    onFilterChange={(tags) => {
                        setRoutePath(getUrl(category, tags));
                    }}
                />
            )}
            {loading ? (
                <Loading />
            ) : data?.ProductCollection.length === 0 ? (
                <StatusIndicator>No products found!</StatusIndicator>
            ) : (
                <ProductGrid width={width} className="product-grid">
                    {data?.ProductCollection.map((product) => (
                        <Product
                            key={product.identifier}
                            product={product}
                            show={show}
                            size={{ height, width }}
                        />
                    ))}
                </ProductGrid>
            )}
        </>
    );
}

export default ProductList;