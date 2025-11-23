export async function getServerSideProps() {
    return {
        redirect: {
            destination: "/api/healthz",
            permanent: false,
        },
    };
}

export default function HealthRedirect() {
    return null;
}
