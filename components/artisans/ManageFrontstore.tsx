'use client'

import { useRef, useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'
import { ROUTES } from '@/constants/routes'
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/products'
import { createBrowserSupabaseClient } from '@/lib/db/supabase-browser'

type Props = {
  artisanId: string
  products: Product[]
}

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: '',
  image_url: '',
  stock_count: '',
}

export default function ManageFrontstore({ artisanId, products: initialProducts }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formValues, setFormValues] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function openAdd() {
    setEditingProduct(null)
    setFormValues(EMPTY_FORM)
    setError('')
    setSuccess('')
    setShowAddForm(true)
  }

  function openEdit(product: Product) {
    setEditingProduct(product)
    setFormValues({
      name: product.name,
      description: product.description ?? '',
      price: String(product.price),
      category: product.category ?? '',
      image_url: product.image_url ?? '',
      stock_count: String(product.stock_count),
    })
    setError('')
    setSuccess('')
    setShowAddForm(true)
  }

  function cancelForm() {
    setShowAddForm(false)
    setEditingProduct(null)
    setFormValues(EMPTY_FORM)
    setError('')
    setSuccess('')
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError('')

    const supabase = createBrowserSupabaseClient()
    const ext = file.name.split('.').pop()
    const path = `${artisanId}/${Date.now()}.${ext}`

    const { error: uploadErr } = await supabase.storage
      .from('product-images')
      .upload(path, file, { upsert: true })

    if (uploadErr) {
      setUploadError('Image upload failed: ' + uploadErr.message)
      setIsUploading(false)
      return
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    setFormValues(prev => ({ ...prev, image_url: data.publicUrl }))
    setIsUploading(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        if (editingProduct) {
          await updateProduct(editingProduct.id, formData)
          setSuccess('Product updated.')
        } else {
          await createProduct(formData)
          setSuccess('Product added.')
        }
        router.refresh()
        cancelForm()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      }
    })
  }

  function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return

    startTransition(async () => {
      try {
        await deleteProduct(product.id)
        setProducts(prev => prev.filter(p => p.id !== product.id))
        router.refresh()
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Delete failed.')
      }
    })
  }

  return (
    <div>
      <div className="manage-header">
        <h1 className="manage-title">My Frontstore</h1>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {!showAddForm && (
            <button className="btn btn-primary" onClick={openAdd} disabled={isPending}>
              + Add Product
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => router.push(ROUTES.ARTISAN_PROFILE(artisanId))}
            disabled={isPending}
          >
            Back to Profile
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="manage-form-card">
          <h2 className="manage-form-title">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="manage-form">
            <div className="manage-field">
              <label htmlFor="name" className="manage-label">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                className="manage-input"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="manage-field">
              <label htmlFor="price" className="manage-label">Price *</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                className="manage-input"
                value={formValues.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="manage-field">
              <label htmlFor="category" className="manage-label">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                className="manage-input"
                value={formValues.category}
                onChange={handleChange}
              />
            </div>

            <div className="manage-field">
              <label htmlFor="stock_count" className="manage-label">Stock</label>
              <input
                id="stock_count"
                name="stock_count"
                type="number"
                min="0"
                className="manage-input"
                value={formValues.stock_count}
                onChange={handleChange}
              />
            </div>

            <div className="manage-field full-width">
              <span className="manage-label">Image</span>
              <div className="manage-image-upload">
                {formValues.image_url && (
                  <img
                    src={formValues.image_url}
                    alt="Product preview"
                    className="manage-image-preview"
                  />
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isPending}
                >
                  {isUploading ? 'Uploading...' : formValues.image_url ? 'Change Image' : 'Upload Image'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <input type="hidden" name="image_url" value={formValues.image_url} />
                {uploadError && <p className="manage-error" style={{ margin: 0 }}>{uploadError}</p>}
              </div>
            </div>

            <div className="manage-field full-width">
              <label htmlFor="description" className="manage-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="manage-textarea"
                value={formValues.description}
                onChange={handleChange}
              />
            </div>

            {error && <p className="manage-error">{error}</p>}
            {success && <p className="manage-success">{success}</p>}

            <div className="manage-form-actions">
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? 'Saving...' : editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelForm}
                disabled={isPending}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="manage-list-card">
        <h2 className="manage-list-title">Products ({products.length})</h2>

        {products.length === 0 ? (
          <p className="manage-empty">No products yet. Add your first product above.</p>
        ) : (
          <table className="manage-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="manage-product-thumb"
                      />
                    ) : (
                      <div className="manage-product-thumb-placeholder">No image</div>
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td className="manage-description-cell">
                    {product.description ?? '—'}
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category ?? '—'}</td>
                  <td>{product.stock_count}</td>
                  <td>
                    <div className="manage-table-actions">
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '6px 14px', fontSize: '13px' }}
                        onClick={() => openEdit(product)}
                        disabled={isPending}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(product)}
                        disabled={isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
