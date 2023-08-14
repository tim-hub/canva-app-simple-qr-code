import React, { useState } from "react";
import { addNativeElement } from "@canva/design/index";
import styles from "../../styles/components.css";
import { Box, Button, FormField, Rows, TextInput } from "@canva/app-ui-kit";
import QRCode from "qrcode";

const QRCodePage = () => {
  const [text, setText] = useState("");

  const getDataUrl = async (): Promise<string> => {
    return QRCode.toDataURL(text);
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const disabled = !text || text.trim().length < 1;

  const addNativeImage = async () => {
    console.log("add image");
    try {
      setIsLoading(true);
      await addNativeElement({
        type: "IMAGE",
        dataUrl: await getDataUrl(),
      });
    } finally {
      console.log("add image done");
      setText("");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <Box padding={"1u"}>
          <FormField
            label="Enter URL"
            value={text}
            control={(props) => (
              <TextInput
                {...props}
                placeholder={"Type anything you want here"}
                onChange={(value) => {
                  setText(value);
                }}
              />
            )}
          />
        </Box>
      </Rows>
      <Rows spacing="3u">
        <Box padding={"1u"} paddingTop={"2u"}>
          <Button
            variant="primary"
            disabled={disabled}
            loading={isLoading}
            stretch
            onClick={addNativeImage}
          >
            Add QR Code
          </Button>
        </Box>
      </Rows>
    </div>
  );
};

export default QRCodePage;
