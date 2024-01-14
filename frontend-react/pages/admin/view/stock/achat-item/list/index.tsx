import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import AchatItemsList from 'app/component/admin/view/stock/achat-item/list/achat-item-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const AchatItems: NextPageWithLayout = () => {
    return <AchatItemsList />
}

AchatItems.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default AchatItems;
