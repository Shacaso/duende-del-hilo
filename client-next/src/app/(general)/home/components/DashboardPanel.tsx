import { InfoIcon } from "@/assets/svg";
import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  Icon?: JSX.ElementType;
  isProduct?: boolean;
  listItems?: any;
}
function DashboardPanelContent({ children }: Props) {
  return (
    <div className='flex flex-col items-start h-full gap-3 overflow-y-auto'>
      {children}
    </div>
  );
}

function DashboardPanelFooter({ children }: Props) {
  return <>{children}</>;
}

export function DashboardPanel({ children, title = "title", Icon }: Props) {
  return (
    <div className='dashboard-page-panel flex flex-col justify-between gap-5 p-5 h-[25rem] bg-base-200 rounded-3xl w-full'>
      <div className='flex items-center gap-5'>
        {/* <Icon className='w-5 h-5 [&>path]:fill-secondary-content' /> */}
        <h1 className='text-xl font-bold'>{title}</h1>
      </div>
      {children}
    </div>
  );
}

DashboardPanel.Content = DashboardPanelContent;
DashboardPanel.Footer = DashboardPanelFooter;
