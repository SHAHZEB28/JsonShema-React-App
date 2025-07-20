import React, { useState } from 'react';

// Properly Typed Tabs Components using Context
const TabsContext = React.createContext<{ activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>> } | null>(null);

const useTabs = () => {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("useTabs must be used within a TabsProvider");
    }
    return context;
};

export const Tabs = ({ children, defaultValue }: { children: React.ReactNode; defaultValue: string }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
};

export const TabsList = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-200/80 p-1 text-slate-600">
        {children}
    </div>
);

export const TabsTrigger = ({ children, value }: { children: React.ReactNode; value: string }) => {
    const { activeTab, setActiveTab } = useTabs();
    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === value ? 'bg-white shadow-md text-slate-950' : ''}`}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({ children, value }: { children: React.ReactNode; value: string }) => {
    const { activeTab } = useTabs();
    if (activeTab !== value) return null;
    return <div className="mt-4">{children}</div>;
};
