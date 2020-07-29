const DotCMSImage = ({ size, alt, data: { path, identifier, name }, className, width }) => {
    let src = `${process.env.NEXT_PUBLIC_DOTCMS_HOST}`;
    let filter = `/filter/resize_w/${size?.width ? size.width : width ? width : 250}/20q`;

    if (path) {
        src += `/${path}`;
    }

    if (identifier && name) {
        src += `/dA/${identifier}/${name}`;
    }

    return (
        <img
            className={className}
            src={`${src}${filter}`}
            alt={alt}
            width={size?.width || '250px'}
            height={size?.height || '250px'}
            loading="lazy"
        />
    );
};

export default DotCMSImage;