using System;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public struct ProductVariantKey
{
    public int MeasurementId { get; }
    public int WorkPieceId  { get; }
    public int? WorkPieceVariantId { get; }

    public ProductVariantKey(int measurementId, int workPieceId, int? workPieceVariantId)
    {
        MeasurementId = measurementId;
        WorkPieceId = workPieceId;
        WorkPieceVariantId = workPieceVariantId;
    }

    public bool Equals(ProductVariantKey other)
    {
        return MeasurementId == other.MeasurementId && WorkPieceId == other.WorkPieceId && WorkPieceVariantId == other.WorkPieceVariantId;
    }

    public override bool Equals(object obj)
    {
        return obj is ProductVariantKey other && Equals(other);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(MeasurementId, WorkPieceId, WorkPieceVariantId);
    }
    
    public static bool operator ==(ProductVariantKey left, ProductVariantKey right)
    {
        return left.Equals(right);
    }

    public static bool operator !=(ProductVariantKey left, ProductVariantKey right)
    {
        return !(left == right);
    }
}