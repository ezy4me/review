import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Pagination} from "react-bootstrap";

const Page = observer(() => {
    const {device} = useContext(Context)
    const pageCount = (device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="pagination__list flex">
            <div className="pagination__item flex">
                {pages.map(page =>
                    <Pagination.Item
                        key={page}
                        active={device.page === page}
                        onClick={() => device.setPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                )}
            </div>
        </Pagination>
    );
});

export default Page;