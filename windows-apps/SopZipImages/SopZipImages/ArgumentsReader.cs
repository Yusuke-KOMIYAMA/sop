using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace SopZipImages
{
    public class ArgumentsReader
    {
        /// <summary>
        /// 元となった文書ファイルのファイル名。
        /// CubePDFが拡張子を落としてしまうので拡張子はなし。
        /// 例: 「手順書サンプル」
        /// </summary>
        public string DocumentFileNameWithoutExtension
        {
            get;
            private set;
        }

        public Dictionary<int, string> ImageFilePaths
        {
            get;
            private set;
        }

        public void Clear()
        {
            DocumentFileNameWithoutExtension = null;
            ImageFilePaths = new Dictionary<int, string>();
        }

        public void Read()
        {
            Clear();

            try
            {
                var arguments = Environment.GetCommandLineArgs();

                // CubePDFで印刷した画像ファイルは以下のような形式になる。
                //
                // {
                //   "C:\Users\tekezo\Desktop\手順書サンプル-001.png",
                //   "C:\Users\tekezo\Desktop\手順書サンプル-002.png",
                //   "C:\Users\tekezo\Desktop\手順書サンプル-003.png",
                //   "C:\Users\tekezo\Desktop\手順書サンプル-004.png",
                //   "C:\Users\tekezo\Desktop\手順書サンプル-005.png",
                // }
                //
                // もしくは1ページだけの場合、以下の形式。
                // {
                //   "C:\Users\tekezo\Desktop\手順書サンプル.png",
                // }

                // 引数は最初の001のみが渡される。
                // 残りのファイルは連番でファイルが存在するかどうか確認していって、
                // ファイルが途切れたところで終わり。

                if (arguments.Length < 2)
                {
                    throw new SopZipImagesException(string.Format("引数がサポートされていない形式です。 {0}", string.Join(",", arguments)));
                }

                // 最初の引数はプログラム自分自身で、arguments[1]がファイルパス。
                var filePath = arguments[1];
                var fileName = Path.GetFileNameWithoutExtension(filePath);
                var extension = Path.GetExtension(filePath);

                // pngのみを許容
                if (extension.ToLower() != ".png")
                {
                    throw new SopZipImagesException(string.Format("画像ファイルの拡張子がサポートしていない形式です。 {0}", extension));
                }

                // 引数がCubePDFから来たものかどうか確認する。
                string pattern = @"^(.+)-001$";
                Regex regex = new Regex(pattern);

                var matches = regex.Matches(fileName);

                if (matches.Count > 0)
                {
                    // 複数ページの場合

                    DocumentFileNameWithoutExtension = matches[0].Groups[1].Value;
                    for (int i = 1; i < 10000; ++i)
                    {
                        var imageFilePath = Path.Combine(
                            Path.GetDirectoryName(filePath),
                            string.Format("{0}-{1:D3}{2}", DocumentFileNameWithoutExtension, i, extension));
                        if (!File.Exists(imageFilePath))
                        {
                            break;
                        }

                        ImageFilePaths[i] = imageFilePath;
                    }
                }
                else
                {
                    // 1ページのみの場合

                    DocumentFileNameWithoutExtension = fileName;

                    ImageFilePaths[1] = filePath;
                }
            }
            catch (SopZipImagesException)
            {
                Clear();
                throw;
            }
        }
    }
}
