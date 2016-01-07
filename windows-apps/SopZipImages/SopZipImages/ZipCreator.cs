using System.IO;
using System.IO.Compression;
using System.Windows;

namespace SopZipImages
{
    public class ZipCreator
    {
        public void Create(ArgumentsReader argumentsReader)
        {
            var directoryName = Path.GetDirectoryName(argumentsReader.ImageFilePaths[1]);
            var zipFilePath = Path.Combine(directoryName, argumentsReader.DocumentFileNameWithoutExtension + ".sopimage");

            // ファイルの上書き確認
            if (File.Exists(zipFilePath))
            {
                var message = string.Format("既に「{0}」ファイルが存在します。上書きしてよろしいですか？", Path.GetFileName(zipFilePath));
                var result = MessageBox.Show(message, "ファイルの上書き確認", MessageBoxButton.YesNo);
                if (result == MessageBoxResult.Yes)
                {
                    File.Delete(zipFilePath);
                }
                else
                {
                    MessageBox.Show("sopimageファイルの作成を中断しました。");

                    // 画像ファイルは消す。
                    deleteImageFiles(argumentsReader);
                    return;
                }
            }

            using (var fileStream = new FileStream(zipFilePath, FileMode.CreateNew))
            {
                using (var archive = new ZipArchive(fileStream, ZipArchiveMode.Create, true))
                {
                    foreach (var imageFilePath in argumentsReader.ImageFilePaths)
                    {
                        var newImageFileName = imageFilePath.Key + Path.GetExtension(imageFilePath.Value);
                        archive.CreateEntryFromFile(imageFilePath.Value, newImageFileName);
                    }
                }
            }

            // zipファイルが作成できたら、ファイルを削除
            deleteImageFiles(argumentsReader);

            // 完了ダイアログを表示。
            {
                var message = string.Format("「{0}」を作成しました。ファイルがあるフォルダを開きますか？", Path.GetFileName(zipFilePath));
                var result = MessageBox.Show(message, "sopimageファイルを作成しました。", MessageBoxButton.YesNo);
                if (result == MessageBoxResult.Yes)
                {
                    System.Diagnostics.Process.Start(
                        "EXPLORER.EXE", string.Format(@"/select,""{0}""", zipFilePath));
                }
            }
        }

        private void deleteImageFiles(ArgumentsReader argumentsReader)
        {
            foreach (var imageFilePath in argumentsReader.ImageFilePaths)
            {
                File.Delete(imageFilePath.Value);
            }
        }
    }
}
