# 启用 TPM 2.0

先检查 TPM 2.0 是否已经启用。如未启用，再按照对应主板的说明进行设置。

> **必须具备 TPM 2.0**
>
> 没有 TPM 2.0，无法使用解锁器。TPM 1.2 设备不满足此要求。

## 先在 Windows 中检查

1. 按 **Windows + R**，输入 `tpm.msc`，然后按 **Enter**。
2. 检查状态是否显示 **Status: The TPM is ready for use**（TPM 已就绪，可以使用）。
3. 在 **TPM Manufacturer Information**（TPM 制造商信息）中，确认 **Specification Version**（规范版本）为 **2.0**。

如果两项检查均通过，说明 TPM 2.0 已经启用。您可以返回[新手入门](zh/getting-started.md#系统要求)。

如果 Windows 显示 **Compatible TPM cannot be found**（找不到兼容的 TPM），可能只是 BIOS 中尚未启用；仅凭此提示不能断定电脑不支持 TPM。[Microsoft 的 TPM 指南](https://support.microsoft.com/en-us/windows/security/devicesecurity/enable-tpm-2-0-on-your-pc)介绍了如何在 Windows 中检查。

## 修改 BIOS 设置之前

BIOS（也称为 UEFI）是主板的设置界面，需要在 Windows 启动前进入。

如果已启用 **BitLocker 或设备加密（Device Encryption）**，请先确保您能通过另一台设备获取恢复密钥。固件设置变更可能导致 Windows 要求输入该密钥。请参阅 [Microsoft 的恢复密钥备份说明](https://support.microsoft.com/en-us/windows/security/encryption/back-up-your-bitlocker-recovery-key)。

**请勿选择 Clear TPM、Reset TPM 或 Erase TPM。** 启用 TPM 不需要清除 TPM；清除操作可能影响已保存的密钥和登录凭据。

重启电脑，并按启动画面提示的按键进入设置，通常为 **Delete** 或 **F2**。如果 BIOS 默认进入简易模式，请切换到 **Advanced Mode**。

## 按主板品牌启用 TPM

在受支持的系统上，**Intel PTT** 和 **AMD fTPM** 都是通过固件实现的 TPM。请按照您所使用的处理器选择对应说明。

> **菜单与下方不同？** 以下是常见路径，并不适用于所有型号。菜单名称和位置会随主板型号及 BIOS 版本变化。如果选项不一致，请查阅您准确型号的主板手册或官方支持页面。参见[查找型号和手册](zh/enable-tpm.md#查找型号和手册)。

### ASUS

- **Intel：** 打开 **Advanced > PCH-FW Configuration**，将 **PTT** 设为 **Enabled**。
- **AMD：** 打开 **Advanced > AMD fTPM configuration**，将 **TPM Device Selection** 设为 **Firmware TPM**。

以上路径来自 [ASUS 官方 TPM 指南](https://www.asus.com/support/faq/1046215/)。

### MSI

- 在 **Click BIOS 5** 中，打开 **Settings > Security > Trusted Computing**。在 **GSE Lite** 中，从 **Security > Trusted Computing** 进入。
- 将 **Security Device Support** 设为 **Enabled**。
- **Intel：** 如果提供 **PTT** 选项，请将其启用。较新型号可能使用 **TPM Device Selection > fTPM 2.0**。
- **AMD：** 如果提供 **AMD fTPM switch** 选项，请将其设为 **AMD CPU fTPM**。

请参阅 [MSI 官方 TPM 指南](https://www.msi.com/blog/How-to-Enable-TPM-on-MSI-Motherboards-Featuring-TPM-2-0)，以及较新的 [Intel Z890](https://us.msi.com/faq/11106) 和 [AMD X870/X870E](https://us.msi.com/faq/faq-11107) 示例。

### Gigabyte / AORUS

- **Intel：** 常见路径为 **Settings > Miscellaneous > Intel Platform Trust Technology (PTT)**。将其设为 **Enabled**。
- **AMD：** 在许多 AM4 主板上，打开 **Advanced Mode > Settings > AMD CPU fTPM**，然后选择 **Enabled**。

请参阅 Gigabyte 的 [Intel BIOS 手册示例](https://download.gigabyte.com/FileList/Manual/mb_manual_z590-vision-d_e.pdf)和 [AMD TPM 设置说明](https://www.gigabyte.com/eu/Support/Consumer/Faq/4395)。请使用该文章中的 TPM 部分；文章另列的 Secure Boot 设置步骤不属于本指南。

### ASRock

- **Intel：** 打开 **Security > Intel Platform Trust Technology**，然后选择 **Enabled**。
- **AMD：** 打开 **Advanced > CPU Configuration > AMD fTPM switch**，然后选择 **AMD CPU fTPM**。

请参阅 [ASRock 官方 TPM 设置说明](https://www.asrock.com/support/faq.asp?id=500)。

## 保存并验证

使用 BIOS 中提示的按键选择 **Save & Exit**，通常为 **F10**，然后等待 Windows 重新启动。再次按照上方步骤运行 `tpm.msc`：TPM 必须处于可用状态，且 **Specification Version** 必须为 **2.0**。

如果仍显示 **1.2**、TPM 尚未就绪或找不到 TPM，请查阅主板的支持页面。仅启用一个设置，并不能将 TPM 1.2 设备变成 TPM 2.0。

## 查找型号和手册

1. 按 **Windows + R**，输入 `msinfo32`，然后按 **Enter**，打开 **System Information**（系统信息）。
2. 在 **System Summary**（系统摘要）中，记下 **BaseBoard Manufacturer**（主板制造商）、**BaseBoard Product**（主板产品）、**BIOS Version/Date**（BIOS 版本/日期）和 **Processor**（处理器）。通过处理器信息即可确定应使用 Intel 还是 AMD 的说明。
3. 在制造商的官方支持网站上查找准确的主板型号。如果制造商区分不同的硬件修订版本，也请确认版本一致。打开该型号的用户手册或 BIOS 指南。
4. 在手册中搜索 **TPM**、**PTT**、**fTPM**、**Trusted Computing** 或 **Security Device Support**。使用搜索引擎时，在准确型号后加上 `enable TPM 2.0`，并优先查看制造商自己的搜索结果。

如果是 **Dell、HP、Lenovo** 或其他整机厂商的笔记本或品牌台式机，请改用电脑的 **System Manufacturer**（系统制造商）和 **System Model**（系统型号）查找。其 BIOS 可能与零售主板不同。

如果 Windows 无法识别主板，请检查包装或型号标签。如果仍找不到该设置，请向制造商确认您的准确硬件型号是否支持 TPM 2.0，以及是否需要适用于该型号的 BIOS 更新。不要猜测应使用哪个 BIOS 文件，也不要认为单独购买的 TPM 模块一定兼容。
