import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import ProduitsList from 'app/component/admin/view/commun/produit/list/produit-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const Produits: NextPageWithLayout = () => {
    return <ProduitsList />
}

Produits.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default Produits;
