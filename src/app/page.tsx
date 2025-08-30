'use client';

import { useState } from "react";

interface FolderItem {
  name: string;
  fileCount: number;
  files: string[];
  size?: number;
  totalData: number;
}

export default function Home() {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [viewingFile, setViewingFile] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);



  const closeFile = () => {
    setSelectedFile(null);
    setViewingFile(false);
    setFileContent('');
  };

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileList = Array.from(files);

    // Filter hanya file PDF
    const pdfFiles = fileList.filter(file => file.name.toLowerCase().endsWith('.pdf'));

    if (pdfFiles.length === 0) {
      alert('Tidak ada file PDF yang ditemukan dalam folder yang dipilih.');
      return;
    }

    const folderName = pdfFiles[0]?.webkitRelativePath?.split('/')[0] || 'Unknown Folder';

    // Group files by their folder structure - hanya PDF
    const fileNames = pdfFiles.map(file => file.name);
    const totalSize = pdfFiles.reduce((sum, file) => sum + file.size, 0);
    const totalData = calculateTotalData(fileNames);

    const newFolder: FolderItem = {
      name: folderName,
      fileCount: pdfFiles.length,
      files: fileNames,
      size: totalSize,
      totalData: totalData
    };

    setFolders(prev => [...prev, newFolder]);
    setShowFolderModal(false);

    // Reset input
    event.target.value = '';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const parseTotalFromFileName = (fileName: string): number => {
    // Regex untuk mencari pola [ TOTAL = angka ]
    const match = fileName.match(/\[ TOTAL = (\d+) \]/i);
    if (match) {
      return parseInt(match[1], 10);
    }
    return 0;
  };

  const calculateTotalData = (fileNames: string[]): number => {
    return fileNames.reduce((total, fileName) => {
      return total + parseTotalFromFileName(fileName);
    }, 0);
  };

  const deleteFolder = (folderIndex: number) => {
    setFolders(prev => prev.filter((_, index) => index !== folderIndex));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                📊 PDF Folder Analyzer - Ganesa Results
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!viewingFile ? (
          <>
                    {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                PDF Folder Analyzer
              </h2>
              <p className="text-gray-600">
                Upload folder PDF untuk analisis data otomatis dari nama file
              </p>
            </div>
            <button
              onClick={() => setShowFolderModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Tambah Folder</span>
            </button>
          </div>
        </div>

            {/* Statistics */}
            {folders.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Folders</p>
                      <p className="text-2xl font-bold text-gray-900">{folders.length}</p>
                      <p className="text-xs text-gray-500">Folder yang dianalisis</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Files</p>
                      <p className="text-2xl font-bold text-gray-900">{folders.reduce((sum, folder) => sum + folder.fileCount, 0)}</p>
                      <p className="text-xs text-gray-500">File PDF dianalisis</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Data</p>
                      <p className="text-2xl font-bold text-gray-900">{folders.reduce((sum, folder) => sum + folder.totalData, 0)}</p>
                      <p className="text-xs text-gray-500">Grand total dari semua folder</p>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Folder Table */}
            {folders.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Data Folder PDF</h3>
                  <p className="text-sm text-gray-600">Tabel hasil analisis folder PDF yang telah ditambahkan</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama Folder
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jumlah File
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Data
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {folders.map((folder, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="p-1 bg-green-100 rounded">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{folder.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{folder.fileCount}</div>
                            <div className="text-xs text-gray-500">PDF files</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-blue-600">{folder.totalData}</div>
                            <div className="text-xs text-gray-500">Total dari semua file</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedFile(`Folder: ${folder.name}`);
                                  setViewingFile(true);
                                  setFileContent(`📁 Folder: ${folder.name}\n\n📊 Statistik:\n• Jumlah File: ${folder.fileCount}\n• Total Data: ${folder.totalData}\n• Total Ukuran: ${folder.size ? formatFileSize(folder.size) : 'Unknown'}\n\n📋 Daftar File PDF:\n${folder.files.map((file, idx) => {
                                    const total = parseTotalFromFileName(file);
                                    return `${idx + 1}. ${file} (Total: ${total})`;
                                  }).join('\n')}`);
                                }}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-xs"
                              >
                                Detail
                              </button>
                              <button
                                onClick={() => deleteFolder(index)}
                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Row */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex space-x-6">
                      <span><strong>Total Folders:</strong> {folders.length}</span>
                      <span><strong>Total Files:</strong> {folders.reduce((sum, folder) => sum + folder.fileCount, 0)}</span>
                      <span><strong>Grand Total:</strong> {folders.reduce((sum, folder) => sum + folder.totalData, 0)}</span>
                    </div>
                    <div className="text-gray-600">
                      Data dihitung dari format [ TOTAL = angka ] pada nama file
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* File Viewer */
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">File Content</h3>
                  <p className="text-sm text-gray-600">{selectedFile}</p>
                </div>
                <button
                  onClick={closeFile}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {fileContent}
                </pre>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  File content displayed as text. For PDF files, consider using a PDF viewer component.
                </p>
                <button
                  onClick={closeFile}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Back to file list
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Folder Selection Modal */}
        {showFolderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Tambah Folder</h3>
                  <button
                    onClick={() => setShowFolderModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>

                  <h4 className="text-lg font-medium text-gray-900 mb-2">Pilih Folder untuk Dideteksi</h4>
                  <p className="text-gray-600 mb-4">
                    Pilih folder yang berisi file PDF yang ingin dideteksi. Sistem akan menghitung jumlah file PDF dan membaca nama file PDF di dalamnya.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>ℹ️ Catatan:</strong> Sistem hanya akan mendeteksi file dengan ekstensi <strong>.pdf</strong>. File dengan ekstensi lain akan diabaikan.
                    </p>
                  </div>

                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      webkitdirectory=""
                      directory=""
                      onChange={handleFolderSelect}
                      className="hidden"
                    />
                    <div className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2 font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Pilih Folder</span>
                    </div>
                  </label>

                  <p className="text-sm text-gray-500 mt-4">
                    Browser akan membuka dialog untuk memilih folder. Pastikan folder yang dipilih berisi file yang ingin dideteksi.
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowFolderModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
