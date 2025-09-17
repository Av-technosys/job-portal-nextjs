import React, { use } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ADMIN_QUESTION_CARD_CONFIG } from "@/constants/adminAssessmentQuestion";
import {
  Radio,
  Stack,
  Typography,
  Paper,
  Menu,
  MenuList,
  IconButton,
} from "../common";
import { useDeleteAssessmentQuestion, useNotification } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface AdminQuestionCardProps {
  questionData: {
    id: string;
    question: string;
    options: { [key: string]: string };
    answer?: string;
  };
  index: number; // <-- Add index prop
  onEdit?: () => void;
  onDelete?: () => void;
}

const AdminQuestionCard: React.FC<AdminQuestionCardProps> = ({
  questionData,
  index,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const normalizeAnswer = React.useMemo(() => {
    if (!questionData.answer) return "";
    return questionData.answer.startsWith("option_")
      ? questionData.answer.replace("option_", "")
      : questionData.answer;
  }, [questionData.answer]);
  const { showNotification } = useNotification();
  const deleteMutation = useDeleteAssessmentQuestion({
    onSuccess: () => {
      showNotification({ message: "Question deleted." });
      queryClient.invalidateQueries();
      onDelete?.();
    },
    onError: () => {
      showNotification({ message: "Failed to delete question." });
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { QUESTION_ID, QUESTION_TEXT, QUESTION_ID_TEXT, QUESTION } =
    ADMIN_QUESTION_CARD_CONFIG;

  const handleMenuClick = (key: string) => {
    if (key === "delete") {
      const idNum = Number(questionData.id);
      if (!Number.isNaN(idNum)) {
        deleteMutation.mutate(idNum);
      }
    }
    if (key === "edit") {
      router.push(`/admin/question/${questionData.id}`);
    }
    handleClose();
  };

  const menuItems = [
    { key: "edit", label: "Edit" },
    { key: "delete", label: "Delete" },
  ];
  return (
    <Stack
      stackProps={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, md: 4 },
        spacing: 2,
        sx: { width: "100%", maxWidth: { xs: "100%", md: 1000 }, mx: "auto" },
      }}
    >
      {/* Question Header */}
      <Stack
        stackProps={{
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          spacing: 2,
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            bgcolor: "#e8f5e9",
            color: "#2e7d32",
            padding: "4px 12px",
            borderRadius: 4,
          }}
        >
          <Typography {...QUESTION_ID_TEXT} />
          <Typography {...QUESTION_ID(questionData)} />
        </Stack>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} handleClose={handleClose}>
          <MenuList menuItems={menuItems} onClick={handleMenuClick} />
        </Menu>
      </Stack>

      {/* Question Content */}
      <Stack
        stackProps={{
          direction: "row",
          spacing: 1,
          sx: { width: "100%", marginTop: 2 },
        }}
      >
        <Typography {...QUESTION_TEXT(index)} />
        <Typography {...QUESTION(questionData)} />
      </Stack>
      {/* Options */}
      <Stack stackProps={{ spacing: 2, sx: { width: "100%", marginTop: 2 } }}>
        {Object.entries(questionData.options).map(([key, value]) => (
          <Paper
            paperProps={{
              elevation: 0,
              sx: {
                p: { xs: 1.5, md: 2 },
                border: "1px solid #e0e0e0",
                backgroundColor: normalizeAnswer === key ? "#c8facc" : "white",
                borderRadius: 1,
              },
            }}
            key={key}
          >
            <Radio
              formControlLabelProps={{
                label: `${key}. ${value}`,
                sx: { width: "100%", margin: 0 },
              }}
              checked={normalizeAnswer === key}
              onChange={() => {}}
              radioProps={{
                name: questionData.id,
                value: key,
                disabled: normalizeAnswer !== key,
              }}
            />
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
};

export default AdminQuestionCard;
