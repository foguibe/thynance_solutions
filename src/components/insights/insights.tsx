"use client";

import { useSession } from "next-auth/react";
import StartupPerformanceOptimizationComponent from "./startup/startup";
import SMEPerformanceOptimizationComponent from "./sme/sme";
import EnterprisePerformanceOptimizationComponent from "./enterprise/enterprise";

export default function InsightsComponent() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session || !session.user) {
        return <p>Unauthorized. Please log in.</p>;
    }

    const role = session.user.role;

    switch (role) {
        case "startup":
            return <StartupPerformanceOptimizationComponent />;
        case "sme":
            return <SMEPerformanceOptimizationComponent />;
        case "enterprise":
            return <EnterprisePerformanceOptimizationComponent />;
        default:
            return <p>Invalid role.</p>;
    }
}
