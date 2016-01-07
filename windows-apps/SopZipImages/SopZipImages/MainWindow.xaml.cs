using System;
using System.Windows;

namespace SopZipImages
{
    /// <summary>
    /// MainWindow.xaml の相互作用ロジック
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            try
            {
                var argumentsReader = new ArgumentsReader();
                argumentsReader.Read();

                var zipCreator = new ZipCreator();
                zipCreator.Create(argumentsReader);
            }
            catch (SopZipImagesException ex)
            {
                MessageBox.Show(ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show("エラーが発生しました。 " + ex.Message);
            }

            Environment.Exit(0);
        }
    }
}
