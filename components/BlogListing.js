const dotCMSApi = require('../config/dotcmsApi');

import Loader from './Loading';
import useDotCMSApi from '../hooks/useDotCMSApi';
import RouterLink from './RouterLink';
import DotCMSImage from './DotCMSImage';
import CustomDate from './CustomDate';

const BlogListing = () => {
    const [loading, posts] = useDotCMSApi(() => {
        return dotCMSApi.esSearch
            .search({
                contentType: 'Blog',
                queryParams: {
                    numberOfResults: '3',
                    sortResultsBy: 'modDate',
                    sortOrder1: 'desc'
                }
            })
            .then(({ contentlets }) => contentlets);
    });

    if (loading) {
        return <Loader />;
    }

    return posts.map(({ title, postingDate, identifier, urlTitle }) => (
        <div className="unit unit-spacing-lg" key={identifier}>
            <div className="unit-left">
                <RouterLink href={`/blog/post/${urlTitle}`}>
                    <DotCMSImage alt={title} width="70" identifier={identifier} />
                </RouterLink>
            </div>
            <div className="unit-body">
                <h6>
                    <RouterLink href={`/blog/post/${urlTitle}`}>{title}</RouterLink>
                </h6>
                {postingDate ? <CustomDate value={postingDate} /> : ''}
            </div>
        </div>
    ));
};

export default BlogListing;
