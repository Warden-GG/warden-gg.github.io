# Enable TPM 2.0

Check whether TPM 2.0 is already enabled, then follow the instructions for your motherboard if needed.

> **TPM 2.0 is required**
>
> You cannot use the unlocker without TPM 2.0. Having a TPM 1.2 device does not meet this requirement.

## Check in Windows first

1. Press **Windows + R**, type `tpm.msc`, and press **Enter**.
2. Look for **Status: The TPM is ready for use**.
3. Under **TPM Manufacturer Information**, check that **Specification Version** is **2.0**.

If both checks pass, TPM 2.0 is already enabled. You can return to [Getting Started](getting-started.md#requirements).

If Windows says **Compatible TPM cannot be found**, it may be disabled in the BIOS; that message alone does not prove your PC lacks TPM support. [Microsoft's TPM guide](https://support.microsoft.com/en-us/windows/security/devicesecurity/enable-tpm-2-0-on-your-pc) explains the Windows checks.

## Before changing BIOS settings

The BIOS (also called UEFI) is your motherboard's settings screen, accessed before Windows starts.

If **BitLocker or Device Encryption** is enabled, make sure you can access your recovery key from another device before proceeding. Firmware changes can cause Windows to request it. See [Microsoft's recovery-key instructions](https://support.microsoft.com/en-us/windows/security/encryption/back-up-your-bitlocker-recovery-key).

**Do not select Clear TPM, Reset TPM, or Erase TPM.** Clearing the TPM is not part of enabling it and can affect stored keys and sign-in credentials.

Restart your PC and press the setup key shown on the startup screen, commonly **Delete** or **F2**. Switch to **Advanced Mode** if your BIOS opens in an easy mode.

## Enable TPM by motherboard brand

On supported systems, **Intel PTT** and **AMD fTPM** are firmware implementations of TPM. Use the instructions matching your processor.

> **Menus look different?** These are common paths, not instructions for every model. Names and locations change between motherboard models and BIOS versions. Use your exact model's handbook or official support page if the options below do not match. See [Find your model and manual](enable-tpm.md#find-your-model-and-manual).

### ASUS

- **Intel:** Open **Advanced > PCH-FW Configuration** and set **PTT** to **Enabled**.
- **AMD:** Open **Advanced > AMD fTPM configuration** and set **TPM Device Selection** to **Firmware TPM**.

These are the examples in [ASUS's official TPM guide](https://www.asus.com/support/faq/1046215/).

### MSI

- In **Click BIOS 5**, open **Settings > Security > Trusted Computing**. In **GSE Lite**, start at **Security > Trusted Computing**.
- Set **Security Device Support** to **Enabled**.
- **Intel:** Enable **PTT** where offered. Newer models may use **TPM Device Selection > fTPM 2.0**.
- **AMD:** Set **AMD fTPM switch** to **AMD CPU fTPM** where offered.

See [MSI's official TPM guide](https://www.msi.com/blog/How-to-Enable-TPM-on-MSI-Motherboards-Featuring-TPM-2-0) and its newer [Intel Z890](https://us.msi.com/faq/11106) and [AMD X870/X870E](https://us.msi.com/faq/faq-11107) examples.

### Gigabyte / AORUS

- **Intel:** A common route is **Settings > Miscellaneous > Intel Platform Trust Technology (PTT)**. Set it to **Enabled**.
- **AMD:** On many AM4 boards, open **Advanced Mode > Settings > AMD CPU fTPM** and choose **Enabled**.

See Gigabyte's [Intel BIOS manual example](https://download.gigabyte.com/FileList/Manual/mb_manual_z590-vision-d_e.pdf) and [AMD TPM instructions](https://www.gigabyte.com/eu/Support/Consumer/Faq/4395). Use the TPM section of that article; its separate Secure Boot steps are not part of this guide.

### ASRock

- **Intel:** Open **Security > Intel Platform Trust Technology** and choose **Enabled**.
- **AMD:** Open **Advanced > CPU Configuration > AMD fTPM switch** and select **AMD CPU fTPM**.

See [ASRock's official TPM instructions](https://www.asrock.com/support/faq.asp?id=500).

## Save and verify

Choose **Save & Exit** using the key shown in your BIOS, commonly **F10**, then let Windows restart. Repeat the `tpm.msc` check above: the TPM must be ready for use and the **Specification Version** must be **2.0**.

If it still shows **1.2**, is not ready, or cannot be found, consult your motherboard's support page. Enabling a setting does not by itself turn a TPM 1.2 device into TPM 2.0.

## Find your model and manual

1. Press **Windows + R**, type `msinfo32`, and press **Enter** to open **System Information**.
2. In **System Summary**, note **BaseBoard Manufacturer**, **BaseBoard Product**, **BIOS Version/Date**, and **Processor**. The processor entry tells you whether to follow Intel or AMD instructions.
3. Find that exact motherboard model on the manufacturer's official support website. Match the board revision too, if the manufacturer lists different revisions. Open its manual, handbook, or BIOS guide.
4. Search the manual for **TPM**, **PTT**, **fTPM**, **Trusted Computing**, or **Security Device Support**. For a web search, use your exact model followed by `enable TPM 2.0`, and prefer the manufacturer's own results.

For a laptop or prebuilt PC from **Dell, HP, Lenovo**, or another system maker, use the PC's **System Manufacturer** and **System Model** instead. Its BIOS can differ from a retail motherboard's BIOS.

If Windows does not identify the board, check its packaging or model label. If the setting is still missing, ask the manufacturer whether your exact hardware supports TPM 2.0 and whether a model-specific BIOS update is needed. Do not guess a BIOS file or assume a separate TPM module will be compatible.
