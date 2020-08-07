import { useContext, useEffect } from 'react';
import Link from 'next/link';
import PageContext from '../contexts/PageContext';
import { emitEMANavEvent } from '../utilities/dotcms';
import { getLocaleHref } from './../utilities/dotcms/locale';

const RouterLink = ({ href, children, className, ariaLabel }) => {
    const { isEditMode, languageProps: { defaultLanguage } = {} } = useContext(PageContext);
    return isEditMode ? (
        <a
            style={{ cursor: 'pointer' }}
            aria-label={ariaLabel}
            onClick={() => {
                emitEMANavEvent(href);
            }}
            className={className}
        >
            {children}
        </a>
    ) : (
        <Link
            href={'/[[...slug]]'}
            as={getLocaleHref({
                as: href,
                defaultLang: defaultLanguage
            })}
        >
            <a aria-label={ariaLabel} className={className}>
                {children}
            </a>
        </Link>
    );
};

export default RouterLink;
