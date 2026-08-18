import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import IconComponent from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
import { Button } from "@/components/ui/button";
import ModalsComponent from "@/pages/MainPage/components/modalsComponent";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { useUtilityStore } from "@/stores/utilityStore";
import type { Users } from "@/types/api";
import { cn } from "@/utils/utils";

export const GetStartedProgress: FC<{
  userData: Users;
  isGithubStarred: boolean;
  isDiscordJoined: boolean;
  handleDismissDialog: () => void;
}> = ({ handleDismissDialog }) => {
  const { t } = useTranslation();
  const [newProjectModal, setNewProjectModal] = useState(false);
  const hideNewFlowButton = useUtilityStore((state) => state.hideNewFlowButton);

  const flows = useFlowsManagerStore((state) => state.flows);
  const hasFlows = flows && flows?.length > 0;

  const handleDismiss = () => {
    handleDismissDialog();
  };

  return (
    <div className="mt-3 w-full">
      <div className="mb-2 flex items-center justify-between">
        <span
          className="text-sm font-medium"
          data-testid="get_started_progress_title"
        >
          {t("sidebar.getStarted")}
        </span>
        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground"
          data-testid="close_get_started_dialog"
        >
          <IconComponent name="X" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 space-y-1">
        {!hideNewFlowButton && (
          <Button
            unstyled
            className={cn("w-full", hasFlows && "pointer-events-none")}
            onClick={() => setNewProjectModal(true)}
          >
            <div
              className={cn(
                "flex min-w-0 items-center gap-2 rounded-md p-2 py-[10px] hover:bg-muted",
                hasFlows && "pointer-events-none text-muted-foreground",
              )}
              data-testid="create_flow_btn_get_started"
            >
              <span data-testid="create_flow_icon_get_started">
                <IconComponent
                  name={hasFlows ? "Check" : "Plus"}
                  className={cn(
                    "h-4 w-4 shrink-0 text-primary",
                    hasFlows && "text-accent-emerald-foreground",
                  )}
                />
              </span>
              <ShadTooltip content={t("sidebar.createFlow")} side="right">
                <span
                  className={cn("truncate text-sm", hasFlows && "line-through")}
                >
                  {t("sidebar.createFlow")}
                </span>
              </ShadTooltip>
            </div>
          </Button>
        )}
      </div>

      <ModalsComponent
        openModal={newProjectModal}
        setOpenModal={setNewProjectModal}
        openDeleteFolderModal={false}
        setOpenDeleteFolderModal={() => {}}
        handleDeleteFolder={() => {}}
      />
    </div>
  );
};
